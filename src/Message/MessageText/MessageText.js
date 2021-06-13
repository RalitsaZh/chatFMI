import React from "react";
import { Avatar } from "@material-ui/core";
import ReactTimeAgo from "react-time-ago";
import styles from "./MessageText.module.scss";
import { Link } from "react-router-dom";

function Comment({ comment, username, time, userPhoto, onClick, uid }) {
  return (
    <React.Fragment>
      <div onClick={onClick} className={styles.comment_container}>
        <div className={styles.comment_details}>
          <Link to={`/profile/${uid}`}>
            <Avatar
              className={styles.comment_avatar}
              alt={username}
              src={userPhoto || "/static/images/avatar/1.jpg"}
            />
            <strong className={styles.comment_username}>{username}</strong>
          </Link>

          <p className={styles.comment}>
            {comment}

            {time && (
              <ReactTimeAgo
                className={styles.time}
                date={time.toDate()}
                locale="en-US"
              />
            )}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Comment;
