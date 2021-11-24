import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userAPI from "../../api/userAPI";

const SearchHeader = () => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [listUser, setListUser] = useState([]);
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleCloseSearch = () => {
    setSearch("");
    setShow(false);
    setListUser([]);
  };
  useEffect(() => {
    (async () => {
      if (search !== "") {
        const response = await userAPI.searchUser(search);
        setListUser(response.data.users);
      }
    })();
  }, [search]);

  return (
    <div className="contain-search">
      <input
        type="text"
        className="nav-search"
        onClick={() => setShow(true)}
        placeholder="Search"
        onChange={handleChangeSearch}
        value={search}
      />
      <button>
        {show ? (
          <i className="fas fa-times" onClick={handleCloseSearch}></i>
        ) : (
          <i className="fas fa-search"></i>
        )}
      </button>
      <div
        className="contain-search-body"
        style={show ? { display: "block" } : {}}
      >
        <ul>
          {listUser.map((user) => (
            <li key={user._id}>
              <img src={user.avatar} alt="" />
              <div>
                <Link to={`/profile/${user.slug}`}>
                  <p>{user.slug}</p>
                </Link>
                <span>{user.fullname}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchHeader;
