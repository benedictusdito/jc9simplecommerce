// Aciton Creator
import axios from "axios";
import cookies from "universal-cookie";

const cookie = new cookies();

export const onLoginUser = (user, pass) => {
  return dispatch => {
    axios
      .get("http://localhost:2020/users", {
        // Mencari parameter tertentu menggunakan params
        params: {
          username: user,
          password: pass
        }
      })
      .then(res => {
        console.log(res);

        if (res.data.length > 0) {
          const { id, username } = res.data[0];
          dispatch({
            type: "LOGIN SUCCESS",
            payload: { id, username }
          });
          console.log("Berhasil Login");

          // creaete data ntuk cookie
          // Menangkap dusername dan id
          cookie.set("userName", { id, username }, { path: "/" });
        } else {
          console.log("Gagal login");
        }
      });
  };
};

export const keepLogin = objUser => {
  return {
    type: "LOGIN SUCCESS",
    payload: {
      id: objUser.id,
      username: objUser.username
    }
  };
};

export const onLogoutUser = () => {
  cookie.remove("userName");
  return {
    type: "LOGOUT_SUCCESS"
  };
};
