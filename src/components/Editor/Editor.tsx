import Modal from "../Custom/Modal"; // Assuming this is your modal path
import type  {editorProps} from "./Editor.type"
import useEditor from './hooks/useEditor';



export default function Editor({ poi, onClose, onDone }: editorProps) 
{
  const editor = useEditor(poi, onDone);
  if (!editor)
    return (<></>)
  const { tags , comment , saving, error, handleTagChange, handleRawTagsChange,handleComments,  save, remove } = editor;

  const inputClass = "w-full rou.nded-lg text-xl text-center !mx-2 border-2 border-gray-200 bg-white px-4 !py-4 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed";
  const labelClass = "text-xl font-semibold text-gray-700 mb-2 block flex items-center gap-2 !p-2";

  return (
    <Modal isOpen={!!poi} setIsOpen={onClose}>
      <div className="  !space-x-6 !space-y-4">
        {/* Header */}
        <div className="!mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {poi?.id === 0 ? 'Create New Point' : `Edit POI #${poi?.id}`}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5"> Point of Interest  Editor</p>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-red-800 text-sm">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="space-y-4">
          {/* Name Field - Full Width */}
          <div>
            <label className={labelClass}>
              <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Name
            </label>
            <input 
              className={inputClass}
              value={tags.name || ''} 
              onChange={e => handleTagChange('name', e.target.value)}
              placeholder="Enter the name of this location"
              disabled={saving}
            />
          </div>

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Amenity
              </label>
              <select 
                className={inputClass}
                value={tags.amenity || ''} 
                onChange={e => handleTagChange('amenity', e.target.value)}
                disabled={saving}
              >
                <option value="">Select amenity type...</option>
                <option value="restaurant">Restaurant</option>
                <option value="cafe">Cafe</option>
                <option value="fuel">Fuel Station</option>
                <option value="hospital">Hospital</option>
                <option value="school">School</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="parking">Parking</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Shop
              </label>
              <input 
                className={inputClass}
                value={tags.shop || ''} 
                onChange={e => handleTagChange('shop', e.target.value)}
                placeholder="e.g., supermarket, bakery"
                disabled={saving}
              />
            </div>

            <div>
              <label className={labelClass}>
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Tourism
              </label>
              <input 
                className={inputClass}
                value={tags.tourism || ''} 
                onChange={e => handleTagChange('tourism', e.target.value)}
                placeholder="e.g., museum, hotel"
                disabled={saving}
              />
            </div>

            <div>
              <label className={labelClass}>
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Leisure
              </label>
              <input 
                className={inputClass}
                value={tags.leisure || ''} 
                onChange={e => handleTagChange('leisure', e.target.value)}
                placeholder="e.g., park, playground"
                disabled={saving}
              />
            </div>
          </div>

          {/* Advanced Section */}
          <details className="group !p-3 ">
            <summary className="cursor-pointer  bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all list-none">
              <div className="flex justify-between !p-4 items-center">
                <span className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Advanced: Raw Tags (JSON)
                </span>
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </summary>
            <div className="mt-3 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-900">
              <textarea 
                value={JSON.stringify(tags, null, 2)} 
                onChange={e => handleRawTagsChange(e.target.value)}
                className="w-full font-mono text-xs p-4 bg-transparent text-emerald-400 h-48 resize-none outline-none"
                disabled={saving}
                spellCheck={false}
              />
            </div>
          </details>

          {/* Changeset Comment */}
          <div>
            <label className={labelClass}>
              <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Changeset Comment <span className="text-red-500">*</span>
            </label>
            <input 
              className={inputClass}
              value={comment} 
              onChange={handleComments} 
              placeholder="Describe your changes (required for audit trail)"
              disabled={saving}
            />
          </div>
        </div>

        {/* Footer Info */}
        {/* {poi?.lng !== undefined && (
          <div className=" !m-6  !p-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Version:</span>
                <span className="px-2 py-1 bg-white rounded-md font-mono text-gray-900 border border-gray-200">
                  {poi?.version}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Coordinates:</span>
                <span className="px-2 py-1 bg-white rounded-md font-mono  ">
                  {poi?.lat?.toFixed(6)}, {poi?.lng?.toFixed(6)}
                </span>
              </div>
            </div>
          </div>
        )} */}

        {/* Action Buttons */}
        <div className="mt-6 flex gap-12 ">
          <button 
            className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 active:scale-[0.98] transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
            onClick={save} 
            disabled={saving}
          >
            {saving ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 !m-2 !text-center !text-lg " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </>
            )}
          </button>

          {poi?.id !== 0 && (
            <button 
              className="!p-4 py-3 rounded-lg border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 hover:border-red-300 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              onClick={remove} 
              disabled={saving}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          )}

          <button 
            className="!p-4 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 active:scale-[0.98] transition-all disabled:opacity-50"
            onClick={onClose} 
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
