import axios from "axios";
const PAIKBOOKER_DOMAIN = "http://192.168.10.8:8111";

const AxiosApi = {
  // NavBar) 브랜드 로고 가져오기 (NavBar3)
  getBrandLogos: async () => {
    const response = await axios.get(PAIKBOOKER_DOMAIN + `/navbar`);
    return response.data;
  },

  // 로그인
  login: async (userId, userPw) => {
    const loginData = {
      userId: userId,
      userPw: userPw,
    };
    return await axios.post(`${PAIKBOOKER_DOMAIN}/auth/login`, loginData);
  },

  // 회원 가입
  // 아이디 중복 체크
  idCheck: async (userId) => {
    return await axios.get(`${PAIKBOOKER_DOMAIN}/auth/idCheck/${userId}`);
  },

  // 이메일 가입 여부 확인
  isEmailExist: async (email) => {
    return await axios.get(`${PAIKBOOKER_DOMAIN}/auth/exists/${email}`);
  },

  // 회원가입
  signup: async (userName, userId, userPw, userMail, userPhone, userImg) => {
    const signupData = {
      userName: userName,
      userId: userId,
      userPw: userPw,
      userMail: userMail,
      userPhone: userPhone,
      userImg: userImg,
    };

    return await axios.post(`${PAIKBOOKER_DOMAIN}/auth/signup`, signupData);
  },

  // 회원정보수정 - 기존정보가져오기
  getMemberInfo: async (userId) => {
    return await axios.get(
      `${PAIKBOOKER_DOMAIN}/member/getMemberInfo/${userId}`
    );
  },

  // 회원정보수정 - update
  updateMemberInfo: (userId, data) => {
    return axios.patch(`${PAIKBOOKER_DOMAIN}/member/${userId}`, data);
  },

  // 회원정보수정 - 비밀번호수정
  updatePassword: async (userId, old_pw, new_pw) => {
    const passwordData = {
      old_pw: old_pw,
      new_pw: new_pw,
    };
    return await axios.put(
      `${PAIKBOOKER_DOMAIN}/member/updatePassword/${userId}`,
      passwordData
    );
  },

  // 메인 화면 가져오기
  getCategories: async () => {
    const response = await axios.get(PAIKBOOKER_DOMAIN + `/stores/categories`);
    return response.data;
  },

  // NavBar 검색
  navBarSearching: async (region, brandName, reservationTime) => {
    try {
      const response = await axios.get(PAIKBOOKER_DOMAIN + `/stores/search`, {
        params: {
          region: region,
          brandName: brandName,
          reservationTime: reservationTime,
        },
      });
      return response.data; // 검색된 매장 데이터 반환
    } catch (error) {
      console.error("매장 검색 실패:", error);
      throw error; // 에러는 상위 컴포넌트에서 처리
    }
  },

  // 매장) 특정 매장 조회 (StoreDetail, StoreDetailReservation)
  getEachStore: async (storeNo) => {
    const response = await axios.get(PAIKBOOKER_DOMAIN + `/stores/${storeNo}`);
    return response.data;
  },

  // 예약) 예약 가능 및 불가능 시간 조회 (StoreDetailReservation)
  times: async (storeNo) => {
    const response = await axios.get(
      PAIKBOOKER_DOMAIN + `/stores/${storeNo}/times`
    );
    return response.data;
  },

  // 예약) 새로운 예약 생성 (StoreDetailReservation)
  createReservation: async (reservationData) => {
    const response = await axios.post(
      PAIKBOOKER_DOMAIN + `/stores/${reservationData.storeNo}/reservations`,
      reservationData
    );
    return reservationData;
  },

  // 메뉴) 메뉴 조회 (StoreDetailMenu)
  getMenus: async (storeNo) => {
    const response = await axios.get(
      PAIKBOOKER_DOMAIN + `/stores/${storeNo}/menus`
    );
    return response.data;
  },

  // 별점) 별점 정보 가져오기 (StoreDetailRating)
  getRatingResults: async (storeNo) => {
    const response = await axios.get(
      PAIKBOOKER_DOMAIN + `/stores/${storeNo}/rating`
    );
    return response.data;
  },

  // 전체 예약 조회
  reservationList: async () => {
    return await axios.get(PAIKBOOKER_DOMAIN + "/reservation");
  },

  // 전체 리뷰 조회
  reviewList: async () => {
    return await axios.get(PAIKBOOKER_DOMAIN + "/auth");
  },

  // 리뷰 추가
  reviewInsert: async (reviewData) => {
    return await axios.post(PAIKBOOKER_DOMAIN + `/auth/add`, reviewData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // 리뷰 수정
  reviewUpdate: async (reviewData) => {
    return await axios.post(PAIKBOOKER_DOMAIN + `/auth/edit`, reviewData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  // 리뷰 삭제
  reviewDelete: async (rvNo) => {
    return await axios.delete(PAIKBOOKER_DOMAIN + `/auth/delete/${rvNo}`);
  },

  // 브랜드 페이지 추가
  getBrandDetails: (brandNo) => {
    return axios.get(PAIKBOOKER_DOMAIN + `/brand/${brandNo}`);
  },

  // MobileHome Search
  getMobileHomeSearchData: async (searchData) => {
    return await axios.get(PAIKBOOKER_DOMAIN + `/mobile/search`, {
      params: { keyword: searchData }, // 검색어를 쿼리 파라미터로 전달
    });
  },

  // ID 찾기
  findIdByEmail: async (email) => {
    return await axios.post(`${PAIKBOOKER_DOMAIN}/auth/findIdByEmail`, {
      email,
    });
  },

  checkIdMail: async (userId, userMail) => {
    const checkData = {
      userId: userId,
      userMail: userMail,
    };
    try {
      return await axios.post(
        `${PAIKBOOKER_DOMAIN}/auth/checkIdMail`,
        checkData
      );
    } catch (error) {
      console.error("checkIdMail error:", error);
      throw error;
    }
  },

  // 비밀번호 업데이트와 메일보내기
  sendPw: async (userId, userMail, userPw) => {
    const emailData = {
      userId: userId,
      userMail: userMail,
      userPw: userPw,
    };
    try {
      return await axios.post(`${PAIKBOOKER_DOMAIN}/auth/sendPw`, emailData);
    } catch (error) {
      console.error("sendTemporaryPassword error:", error);
      throw error;
    }
  },
};

export default AxiosApi;
