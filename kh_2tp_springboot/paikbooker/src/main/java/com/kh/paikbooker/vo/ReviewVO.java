package com.kh.paikbooker.vo;

import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor // 매개변수가 전부 다 있는 생성자
@NoArgsConstructor // 매개변수가 없는 생성자 (기본 생성자)
@ToString

public class ReviewVO {

    private int rvNo;
    private String userId;
    private Date rvDate;
    private String storeName;
    private Date rTime;
    private int rNo;
    private BigDecimal rvPrice;
    private BigDecimal rvTaste;
    private BigDecimal rvVibe;
    private BigDecimal rvKind;

}
