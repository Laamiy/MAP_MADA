import type React from "react";
import Modal from "../Custom/Modal";
import type { PointOfInterestInterface } from "../../interface/point.of.interest.interface";
import { useState } from "react";

interface EditInfoModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pointOfInterestData: PointOfInterestInterface;
}

function EditInfoModal({
  isOpen,
  setIsOpen,
  pointOfInterestData,
}: EditInfoModalProps) {
  const defaultData = {
    name: "Bemahatazana",
    amenity: "maison",
    tourism: "hotel",
    shop: "market",
    man_made: "building",
    leisure: "park",
    natural: "forest",
    tags: { description: "Fokontany Ambohimanana\nCommune Analavory" },
    version: 1,
    lng: 46.808147,
    lat: -18.969717100448694,
  };
  const [name, setName] = useState(defaultData.name);
  const [amenity, setAmenity] = useState(defaultData.amenity ?? "");
  const [tourism, setTourism] = useState(defaultData.tourism ?? "");
  const [shop, setShop] = useState(defaultData.shop ?? "");
  const [manMade, setManMade] = useState(defaultData.man_made ?? "");
  const [leisure, setLeisure] = useState(defaultData.leisure ?? "");
  const [natural, setNatural] = useState(defaultData.natural ?? "");
  const [tags, setTags] = useState(defaultData.tags.description);
  const [version, setVersion] = useState(defaultData.version);
  const [lng, setLng] = useState(defaultData.lng);
  const [lat, setLat] = useState(defaultData.lat);
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>{pointOfInterestData.osm_id}</div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* name */}
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">Name</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-sm border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-white-500  focus:ring-white transition"
            />
          </div>

          {/* amenity */}
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">
              Amenity
            </div>
            <input
              value={amenity}
              onChange={(e) => setAmenity(e.target.value)}
              className="w-full rounded-sm border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-white-500  focus:ring-white transition"
            />
          </div>

          {/* leisure */}
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">
              Leisure
            </div>
            <input
              value={leisure}
              onChange={(e) => setLeisure(e.target.value)}
              className="w-full rounded-sm border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-white-500  focus:ring-white transition"
            />
          </div>

          {/* manMade */}
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">
              Man made
            </div>
            <input
              value={manMade}
              onChange={(e) => setManMade(e.target.value)}
              className="w-full rounded-sm border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-white-500  focus:ring-white transition"
            />
          </div>

          {/* tourism */}
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">
              Tourism
            </div>
            <input
              value={tourism}
              onChange={(e) => setTourism(e.target.value)}
              className="w-full rounded-sm border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-white-500  focus:ring-white transition"
            />
          </div>

          {/* natural */}
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">
              Natural
            </div>
            <input
              value={natural}
              onChange={(e) => setNatural(e.target.value)}
              className="w-full rounded-sm border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-white-500  focus:ring-white transition"
            />
          </div>

          {/* shop */}
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">shop</div>
            <input
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              className="w-full rounded-sm border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-white-500  focus:ring-white transition"
            />
          </div>

          {/* tags */}
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">tags</div>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-sm border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-white-500  focus:ring-white transition"
            />
          </div>

          {/* version */}
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">
              Version
            </div>
            <input
              type="number"
              value={version}
              onChange={(e) => setVersion(Number(e.target.value))}
              className="w-full rounded-sm border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-white-500  focus:ring-white transition"
            />
          </div>

          {/* lng */}
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">
              Longitude
            </div>
            <input
              type="number"
              step={0.000001}
              value={lng}
              onChange={(e) => setLng(Number(e.target.value))}
              className="w-full rounded-sm border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-white-500  focus:ring-white transition"
            />
          </div>

          {/* lat */}
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-1">
              Latitude
            </div>
            <input
              type="number"
              step={0.000001}
              value={lat}
              onChange={(e) => setLat(Number(e.target.value))}
              className="w-full rounded-sm border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-white-500  focus:ring-white transition"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-[#ca1717] text-white hover:bg-red-600 cursor-pointer hover:scale-90 duration-300"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-[#189d42] text-white cursor-pointer hover:bg-[#0c0] hover:scale-90 duration-300 h-10"
            onClick={() => setIsOpen(false)}
          >
            Confirmer
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditInfoModal;
