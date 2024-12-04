package com.kh.paikbooker.dao;

import com.kh.paikbooker.vo.ReservationVO;
import com.kh.paikbooker.vo.StoreVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.text.SimpleDateFormat;
import java.util.*;

@Repository
public class StoreDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 예약) 쿼리문
    private static final String SELECT_ALL_STORES = "SELECT * FROM STORE_TB ORDER BY STORE_NO ASC";
    private static final String SELECT_STORE_BY_STORE_NO = "SELECT * FROM STORE_TB WHERE STORE_NO = ?";
    private static final String SELECT_RESERVED_TIMES = "SELECT TO_CHAR(R_TIME, 'HH24:MI') FROM RESERVATION_TB WHERE STORE_NO = ? AND TRUNC(R_TIME) = TO_DATE(?, 'YYYY-MM-DD')";
    private static final String REFER_STOREINFO = "SELECT STORE_NO, STORE_NAME, STORE_PHONE, BRAND_NAME FROM STORE_TB WHERE STORE_NO = ?";
    private static final String INSERT_RESERVATIONS = """
            INSERT INTO RESERVATION_TB 
            (R_TIME, R_PERSON_CNT, USER_ID, USER_NAME, STORE_NO, STORE_NAME, STORE_PHONE, BRAND_NAME)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """;
    private static final String SELECT_BRAND_BY_STORE_NO = "SELECT BRAND_NAME FROM STORE_TB WHERE STORE_NO = ?";
    private static final String SELECT_ADDR_AND_BRAND_BY_STORE_NO = "SELECT STORE_ADDR, BRAND_NAME FROM STORE_TB WHERE STORE_NO = ?";

    // 예약) 전체 매장 조회
    public List<StoreVO> getAllStores() {
        return jdbcTemplate.query(SELECT_ALL_STORES, new BeanPropertyRowMapper<>(StoreVO.class));
    }

    // 예약) 특정 매장 조회
    public StoreVO getStoreByStoreNo(int storeNo) {
        return jdbcTemplate.queryForObject(SELECT_STORE_BY_STORE_NO, new Object[]{storeNo}, new BeanPropertyRowMapper<>(StoreVO.class));
    }

    // 예약) 예약 불가능 시간 조회
    public List<String> getReservedTimes(int storeNo, String date) {
        return jdbcTemplate.queryForList(SELECT_RESERVED_TIMES, new Object[]{storeNo, date}, String.class);
    }

    // 예약) 예약 가능 시간 조회
    public List<String> getAvailableTimes(int storeNo, String date, Date storeOpen, Date storeClose) {
        List<String> reservedTimes = jdbcTemplate.queryForList(SELECT_RESERVED_TIMES, new Object[]{storeNo, date}, String.class);
        List<String> allTimes = generateTimes(storeOpen, storeClose); // 모든 시간 생성
        allTimes.removeAll(reservedTimes); // 예약된 시간 제거
        return allTimes;
    }

    // 예약) 새로운 예약 생성
    public void addReservation(ReservationVO reservationVO, String userId, String userName, int storeNo) {
        Map<String, Object> storeInfo = jdbcTemplate.queryForMap(REFER_STOREINFO, storeNo);
        jdbcTemplate.update(INSERT_RESERVATIONS,
                reservationVO.getRTime(),
                reservationVO.getRPersonCnt(),
                userId,
                userName,
                storeInfo.get("STORE_NO"),
                storeInfo.get("STORE_NAME"),
                storeInfo.get("STORE_PHONE"),
                storeInfo.get("BRAND_NAME"));
    }

    // 예약) 영업 시간을 기준으로 1시간 간격의 시간 리스트 생성 (1시간 단위로 예약)
    private List<String> generateTimes(Date storeOpen, Date storeClose) {
        List<String> times = new ArrayList<>();
        Calendar cal = Calendar.getInstance();
        cal.setTime(storeOpen);
        while (cal.getTime().before(storeClose)) {
            times.add(new SimpleDateFormat("HH:mm").format(cal.getTime()));
            cal.add(Calendar.HOUR_OF_DAY, 1);
        }
        return times;
    }

//    // 지도) 좌표로 지도 위치 설정
//    public StoreVO getBrandByStoreNo(int storeNo) {
//        return jdbcTemplate.queryForObject(SELECT_BRAND_BY_STORE_NO, new Object[]{storeNo}, new BeanPropertyRowMapper<>(StoreVO.class));
//    }

    // 지도) 매장 주소로 지도 위치 설정
    public StoreVO getAddrAndBrandByStoreNo(int storeNo) {
        return jdbcTemplate.queryForObject(SELECT_ADDR_AND_BRAND_BY_STORE_NO, new Object[]{storeNo}, new BeanPropertyRowMapper<>(StoreVO.class));
    }

}

