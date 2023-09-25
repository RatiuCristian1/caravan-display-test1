import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore/lite";
import { db } from "../api"; // Import your Firestore instance from api.js
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export default function Caravans() {
  const [caravans, setCaravans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "caravans"));
        const querySnapshot = await getDocs(q);
        const caravanData = [];

        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          const storageRef = ref(getStorage(), data.imagePath); // Assuming you have an "imagePath" field in your Firestore data

          try {
            const downloadURL = await getDownloadURL(storageRef);
            data.imageUrl = downloadURL;
            caravanData.push({
              id: doc.id,
              ...data,
            });
          } catch (error) {
            console.error(`Error fetching download URL for ${data.imagePath}: `, error);
          }
        }

        setCaravans(caravanData);
      } catch (error) {
        console.error("Error fetching caravans: ", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs once after initial render

  return (
    <div className="caravans-container">
      <h1 className="caravans--title">Caravans</h1>
      <div className="caravan-list">
        {caravans.map((caravan) => (
          <div key={caravan.id} className="caravan-card">
            <Link to={`/caravans/${caravan.id}`} className="caravan-link">
            <img
              src={caravan.imageUrl}
              alt={caravan.description}
              className="caravan-image"
            />
            {/* <div className="caravan-description">{caravan.description}</div> */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
