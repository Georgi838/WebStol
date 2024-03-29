import React, { useEffect, useState } from "react";
import "../../styles/usersListCC.css";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

import app from "../../custom/firebase";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore(app);
const dbUsersUIDcollection = collection(db, "usersUID");
const dbMealsCollection = collection(db, "meals");
const dbInfoCollection = collection(db, "dbInfo");

export default function UsersListCC({ Set_UL_CC_GetEatNumber_Loading }) {
  const navigate = useNavigate();
  const [eatNumberForTomorrow, setEatNumberForTomorrow] = useState();
  const [eatNumberForToday, serEatNumberForToday] = useState();

  function GetEatNumber() {
    const FuncInScope = async () => {
      let eatNumberLet = 0;
      const q = query(dbUsersUIDcollection, where("EatTrueFalse", "==", true));

      await getDocs(q).then((res) => {
        res.forEach(() => {
          eatNumberLet++;
        });
        setEatNumberForTomorrow(eatNumberLet);
      });

      const docRef = doc(dbInfoCollection, "eatTimesForToday");

      await getDoc(docRef).then((doc) => {
        serEatNumberForToday(doc.data().eatTimesForToday);
      });

      Set_UL_CC_GetEatNumber_Loading(false);
    };

    FuncInScope();

    return (
      <div className="tab__description-users">
          {eatNumberForToday === 1 ? (
            
            <p className="column-p">
            Днес ще обядва: <span>{eatNumberForToday} ученик</span>
            </p>
            ):(
              <p className="column-p">
              Днес ще обядват: <span>{eatNumberForToday} ученици</span>
              </p>
            )}
        {eatNumberForTomorrow === 1 ? (

          <p className="column-p">
          До момента утре ще обядва: <span>{eatNumberForTomorrow} ученик</span>
        </p>
          ): (
            <p className="column-p">
            До момента утре ще обядват: <span>{eatNumberForTomorrow} ученици</span>
          </p>
          )}
      </div>
    );
  }

  const goToUsersListPage = () => {
    navigate("/usersListPage");
  };

  return (
    <>
      <div className="tab__description-users">
        <GetEatNumber />
        <div className="btn-content">
          <button className="button" onClick={goToUsersListPage}>
            Към списъка
          </button>
        </div>
      </div>
    </>
  );
}
