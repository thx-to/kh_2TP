package com.kh.paikbooker.controller;

import com.kh.paikbooker.dao.StoreDAO;
//import com.kh.paikbooker.service.StoreService;
import com.kh.paikbooker.vo.ReservationVO;
import com.kh.paikbooker.vo.StoreVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/stores")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class StoreController {

//    private final StoreService storeService;

    @Autowired
    private StoreDAO storeDAO;

    // 예약) 전체 매장 조회
    @GetMapping
    public List<StoreVO> getAllStores() {
        return storeDAO.getAllStores();
    }

    // 예약) 특정 매장 조회
    @GetMapping("/{storeNo}")
    public StoreVO getStoreByStoreNo(@PathVariable int storeNo) {
        return storeDAO.getStoreByStoreNo(storeNo);
    }

    // 예약) 예약 가능 및 예약 불가능 시간 조회
    @GetMapping("/{storeNo}/times")
    public Map<String, List<String>> getAllTimes(@PathVariable int storeNo) {
        System.out.println("storeNo: " + storeNo); // storeNo 출력 (디버깅용)

        // StoreVO 객체 가져오기
        StoreVO storeVO = storeDAO.getStoreByStoreNo(storeNo);
        if (storeVO != null) {
            System.out.println("Store found: " + storeVO.getStoreName()); // StoreVO가 존재하는 경우, Store 이름 출력
        } else {
            System.out.println("Store not found for storeNo: " + storeNo); // StoreVO가 null인 경우
        }

        // 전체 영업 시간 생성
        List<String> allTimes = storeDAO.generateAvailableTimes(storeVO.getBrandOpen(), storeVO.getBrandClose());
        System.out.println("All times: " + allTimes); // 생성된 전체 시간 출력

        // 예약된 시간 조회
        List<String> reservedTimes = storeDAO.getReservedTimes(storeNo);
        System.out.println("Reserved times: " + reservedTimes); // 예약된 시간 출력

        // 예약 가능 시간 계산
        List<String> availableTimes = new ArrayList<>(allTimes);
        availableTimes.removeAll(reservedTimes);
        System.out.println("Available times: " + availableTimes); // 예약 가능 시간 출력

        // 결과를 Map으로 반환
        Map<String, List<String>> response = new HashMap<>();
        response.put("availableTimes", availableTimes);
        response.put("reservedTimes", reservedTimes);

        return response;
    }


    // 예약) 새로운 예약 생성
    @PostMapping("/{storeNo}/reservations")
    public ResponseEntity<?> addReservation(
            @PathVariable int storeNo,
//            @RequestParam String userId,
//            @RequestParam String userName,
            @RequestBody ReservationVO reservationVO) {
        try {
            System.out.println("예약 정보: " + reservationVO.toString());  // 디버깅 로그
            // 예약 생성
            storeDAO.addReservation(reservationVO, storeNo);
            return ResponseEntity.ok("예약 성공");
        } catch (Exception e) {
            System.out.println("예약 정보: " + reservationVO.toString());
            return ResponseEntity.badRequest().body("예약 실패 : " + e.getMessage());
        }
    }

//    // 지도) 좌표로 지도 위치 설정
//    @GetMapping("/{storeNo}/mapgps")
//    public StoreVO getBrandByStoreNo(@PathVariable int storeNo) {
//        return storeDAO.getBrandByStoreNo(storeNo);
//    }

    // 지도) 매장 주소로 지도 위치 설정
    @GetMapping("/{storeNo}/map")
    public StoreVO getAddrAndBrandByStoreNo(@PathVariable int storeNo) {
        return storeDAO.getAddrAndBrandByStoreNo(storeNo);
    }

//    // 검색) 매장 검색 API
//    @GetMapping("/search") // HTTP GET 메서드는 일반적으로 데이터를 조회하는 데 사용
//    public ResponseEntity<List<StoreVO>> searchStores(
//            // @RequestParam //HTTP 요청의 쿼리 파라미터를 메서드 매개변수로 매핑합니다.
//            // 예: /search?=Seouregionl&brandName=Starbucks 요청 시 region은 "Seoul", brandName은 "Starbucks"가 됩니다.
//            @RequestParam(required = false) String region,
//            // **required = false**를 지정하면 파라미터가 선택적이 되며,
//            // 요청에 해당 파라미터가 포함되지 않더라도 에러가 발생하지 않도록 처리됩니다.
//            @RequestParam(required = false) String brandName,
//            @RequestParam(required = false) String reservationTime) {
//
//        // 디버깅용
//        log.error("검색 조건 - 지역: {}, 브랜드명: {}, 예약시간: {}", region, brandName, reservationTime);
//        // StoreDao를 사용하여 조건에 맞는 매장 리스트를 조회
//        List<StoreVO> storeList = storeService.searchStores(region, brandName, reservationTime);
//        return ResponseEntity.ok(storeList); // 매장 리스트 반환
//    }
//
//    // 검색) 카테고리 목록을 반환하는 API
//    @GetMapping("/categories")
//    public ResponseEntity<Map<String, List<String>>> getCategories() {
//        Map<String, List<String>> categories = storeService.getCategories();
//        return ResponseEntity.ok(categories);
//    }

}
