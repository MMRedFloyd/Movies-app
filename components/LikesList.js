import { useContext, useEffect, useState } from "react";
import classes from "./LikesList.module.css";
import AuthContext from "@/context/auth-contextMirza";
import Lists from "./UI/Lists";
import { AiFillHeart } from "react-icons/ai";
import { useCollection } from "@/hooks/useCollectionMirza";

function LikesList(props) {
  const [likes, setLikes] = useState([]);
  const authCtx = useContext(AuthContext);
  const { removeFromCollection } = useCollection(props);

  useEffect(() => {
    async function getBookmarks() {
      const response = await fetch(
        "https://movies-app-f63b3-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );
      const data = await response.json();

      const foundedUser = Object.values(data).find(
        (user) => user.username === authCtx.currentAcc.username
      );

      setLikes(foundedUser.likes);
    }
    getBookmarks();
  }, [authCtx]);

  return (
    <Lists open={props.open}>
      <div className={classes.bookmarksList}>
        {likes.map((like) => (
          <li className={classes.onebookmark} key={like.id}>
            <img className={classes.littleimage} src={like.image} alt="" />
            <div className={classes.titleandyear}>
              <p className={classes.bookmarktitle}>{like.title}</p>
              <p className={classes.bookmarktitle}>{like.year}</p>
            </div>
            <AiFillHeart
              size={30}
              className={classes.listicon}
              onClick={(e) => removeFromCollection(e, "likes")}
            />
          </li>
        ))}
      </div>
    </Lists>
  );
}

export default LikesList;
