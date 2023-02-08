import React from "react";
import "../App.css";

const UserComments = ({ name, body, createdAt, msg }) => {
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="comments-list">
            <div className="media">
              {msg ? (
                <h4>{msg}</h4>
              ) : (
                <>
                  <div className="media-left">
                    <img
                      className="rounded-circle"
                      src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
                      alt="user"
                    />
                  </div>

                  <div className="media-body">
                    <h3 className="text-start media-heading user_name">
                      {name}
                      <small>{createdAt.toDate().toDateString()}</small>
                    </h3>
                    <p className="text-start">{body}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComments;
