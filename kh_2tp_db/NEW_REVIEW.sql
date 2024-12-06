-- REVIEW 테이블 생성
CREATE TABLE REVIEW_TB (
	RV_NO INTEGER NOT NULL PRIMARY KEY,	/* 리뷰번호 */
	RV_DATE DATE DEFAULT SYSDATE,		/* 작성일자 */
	R_NO INTEGER NOT NULL,				/* 예약번호 */
	R_TIME VARCHAR2(20) NOT NULL,	    /* 예약시간 (날짜와 시간 포함) */
	R_SUBMIT_TIME DATE NOT NULL,		/* 예약버튼 누른 시간 */
	USER_ID VARCHAR2(20) NOT NULL,		/* 작성자ID */
	STORE_NAME VARCHAR2(100),			/* 방문매장명 */
	RV_PRICE DECIMAL(3, 1) NOT NULL,	/* 별점(가격) */
	RV_TASTE DECIMAL(3, 1) NOT NULL,	/* 별점(맛) */
	RV_VIBE DECIMAL(3, 1) NOT NULL,		/* 별점(분위기) */
	RV_KIND DECIMAL(3, 1) NOT NULL,		/* 별점(친절도) */
	--	FK 제약조건
	CONSTRAINT FK_REVIEW_RESERVATION
		FOREIGN KEY (R_NO, R_TIME, R_SUBMIT_TIME, USER_ID, STORE_NAME)
		REFERENCES RESERVATION_TB (R_NO, R_TIME, R_SUBMIT_TIME, USER_ID, STORE_NAME)
		ON DELETE CASCADE,
	-- 별점 범위(0~5) 제한
    CONSTRAINT CHK_PRICE_RANGE CHECK (RV_PRICE BETWEEN 0.0 AND 5.0),
    CONSTRAINT CHK_TASTE_RANGE CHECK (RV_TASTE BETWEEN 0.0 AND 5.0),
    CONSTRAINT CHK_VIBE_RANGE CHECK (RV_VIBE BETWEEN 0.0 AND 5.0),
    CONSTRAINT CHECK_KIND_RANGE CHECK (RV_KIND BETWEEN 0.0 AND 5.0)
);


-- RV_NO 시퀀스 생성
CREATE SEQUENCE RV_NO_SEQ
INCREMENT BY 1
START WITH 1
NOCYCLE
NOCACHE;


-- REVIEW 더미 데이터 생성
INSERT INTO REVIEW_TB (RV_NO, RV_DATE, R_NO, R_TIME, R_SUBMIT_TIME, USER_ID, STORE_NAME, RV_PRICE, RV_TASTE, RV_VIBE, RV_KIND)
SELECT RV_NO_SEQ.NEXTVAL, SYSDATE, 1,
R.R_TIME, R.R_SUBMIT_TIME, R.USER_ID, R.STORE_NAME, 5.0, 4.5, 4.0, 5.0
FROM RESERVATION_TB R WHERE R.R_NO = 1;

INSERT INTO REVIEW_TB (RV_NO, RV_DATE, R_NO, R_TIME, R_SUBMIT_TIME, USER_ID, STORE_NAME, RV_PRICE, RV_TASTE, RV_VIBE, RV_KIND)
SELECT RV_NO_SEQ.NEXTVAL, SYSDATE, 2,
R.R_TIME, R.R_SUBMIT_TIME, R.USER_ID, R.STORE_NAME, 5.0, 5.0, 5.0, 5.0
FROM RESERVATION_TB R WHERE R.R_NO = 2;

INSERT INTO REVIEW_TB (RV_NO, RV_DATE, R_NO, R_TIME, R_SUBMIT_TIME, USER_ID, STORE_NAME, RV_PRICE, RV_TASTE, RV_VIBE, RV_KIND)
SELECT RV_NO_SEQ.NEXTVAL, SYSDATE, 3,
R.R_TIME, R.R_SUBMIT_TIME, R.USER_ID, R.STORE_NAME, 3.0, 1.0, 2.5, 5.0
FROM RESERVATION_TB R WHERE R.R_NO = 3;

INSERT INTO REVIEW_TB (RV_NO, RV_DATE, R_NO, R_TIME, R_SUBMIT_TIME, USER_ID, STORE_NAME, RV_PRICE, RV_TASTE, RV_VIBE, RV_KIND)
SELECT RV_NO_SEQ.NEXTVAL, SYSDATE, 4,
R.R_TIME, R.R_SUBMIT_TIME, R.USER_ID, R.STORE_NAME, 2.0, 5.0, 3.5, 1.0
FROM RESERVATION_TB R WHERE R.R_NO = 4;

INSERT INTO REVIEW_TB (RV_NO, RV_DATE, R_NO, R_TIME, R_SUBMIT_TIME, USER_ID, STORE_NAME, RV_PRICE, RV_TASTE, RV_VIBE, RV_KIND)
SELECT RV_NO_SEQ.NEXTVAL, SYSDATE, 5,
R.R_TIME, R.R_SUBMIT_TIME, R.USER_ID, R.STORE_NAME, 3.0, 4.0, 1.5, 0.0
FROM RESERVATION_TB R WHERE R.R_NO = 5;


-- REVIEW 테스트용 쿼리문
SELECT * FROM REVIEW_TB;					/* 전체 데이터 조회 */

DELETE FROM REVIEW_TB WHERE RV_NO = '5'; 	/* 리뷰번호 단위로 데이터 삭제 */

DROP SEQUENCE RV_NO_SEQ;					/* 리뷰 시퀀스 삭제 */

DROP TABLE REVIEW_TB;						/* 리뷰 테이블 삭제 */

COMMIT;
