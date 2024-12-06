import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// 시간 버튼 컨테이너
export const TimeButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 버튼이 많을 경우 줄 바꿈 처리 */
  gap: 10px; /* 버튼 간격 */
`;

// 시간 버튼 스타일
export const TimeButton = styled.button`
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  &.available {
    background-color: black;
    color: white;
  }
  &.reserved {
    background-color: gray;
    color: white;
    cursor: not-allowed;
  }
  &.selected {
    background-color: green;
    color: white;
  }
`;

// 인원 버튼 컨테이너
export const PersonButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 버튼이 많을 경우 줄 바꿈 처리 */
  gap: 10px; /* 버튼 간격 */
`;

// 인원 버튼 스타일
export const PersonButton = styled.button`
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  cursor: pointer;
  &.available {
    background-color: black;
    color: white;
  }
  &.reserved {
    background-color: gray;
    color: white;
    cursor: not-allowed;
  }
  &.selected {
    background-color: green;
    color: white;
  }
`;

const StoreDetailReservation = () => {
  const { storeNo } = useParams();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [storeName, setStoreName] = useState("");

  // 스토어 이름 조회 (alert용)
  useEffect(() => {
    const getStoreName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8111/stores/${storeNo}`
        );
        setStoreName(response.data);
      } catch (error) {
        console.error("매장명 조회 오류 발생 : ", error);
      }
    };
    getStoreName();
  }, [storeNo]);

  // 예약 가능 및 예약 불가능 시간 조회
  useEffect(() => {
    const getTimes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8111/stores/${storeNo}/times`
        );
        // 백엔드 API에서 Map 반환 > JSON형식으로 직렬화되어 프론트에 전달
        // 이미 JSON 형식으로 처리되므로 일반 객체로 접근 가능
        setAvailableTimes(response.data.availableTimes);
        setReservedTimes(response.data.reservedTimes);
      } catch (error) {
        console.log(availableTimes);
        console.log(reservedTimes);
        console.error("예약 가능/불가능 시간 가져오기 증 오류 발생 : ", error);
      }
    };
    getTimes();
  }, [storeNo]);

  // 현재 시간 이후의 시간만 표시
  const filterTimes = (times) => {
    const currentHour = new Date().getHours(); // 현재 시간 (24시간 형식)
    return times.filter((time) => Number(time) > currentHour);
  };

  const filteredAvailableTimes = filterTimes(availableTimes);
  const filteredReservedTimes = filterTimes(reservedTimes);
  const combinedTimes = [...reservedTimes, ...availableTimes].sort(
    (a, b) => a - b
  );

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handlePersonSelect = (person) => {
    setSelectedPerson(person);
  };

  const handleSubmit = async () => {
    if (!selectedTime || !selectedPerson) {
      alert("시간과 인원을 모두 선택해주세요.");
      return;
    }
    try {
      await axios.post(`http://localhost:8111/stores/${storeNo}/reservations`, {
        rTime: selectedTime,
        rPersonCnt: selectedPerson,
      });

      alert(
        `${storeName.storeName} ${selectedTime}:00 ${selectedPerson}명\n
        예약이 성공적으로 완료되었습니다!`
      );
      console.log("Sending data:", {
        rTime: selectedTime,
        rPersonCnt: selectedPerson,
      });
      setSelectedTime(null);
      setSelectedPerson(null);
    } catch (error) {
      console.error("예약 요청 오류: ", error);
      alert("예약에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <h2>예약 시간 선택</h2>
      <p>{`reservedTimes : ${reservedTimes.sort((a, b) => a - b)}`}</p>
      <p>{`availableTimes : ${availableTimes.sort((a, b) => a - b)}`}</p>
      <TimeButtonContainer>
        {combinedTimes.map((time) => {
          const isReserved = filteredReservedTimes.includes(time);
          const isAvailable = filteredAvailableTimes.includes(time);

          return isReserved ? (
            <TimeButton key={time} className="reserved" disabled>
              {time}:00
            </TimeButton>
          ) : isAvailable ? (
            <TimeButton
              key={time}
              className={`available ${selectedTime === time ? "selected" : ""}`}
              onClick={() => handleTimeSelect(time)}
            >
              {time}:00
            </TimeButton>
          ) : null;
        })}
      </TimeButtonContainer>
      <h6>선택된 시간: {selectedTime}:00</h6>
      <br />
      {selectedTime && (
        <>
          <h3>인원 선택</h3>
          <PersonButtonContainer>
            {Array.from({ length: 15 }, (_, i) => i + 1).map((person) => (
              <PersonButton
                key={person}
                className={`available ${
                  selectedPerson === person ? "selected" : ""
                }`}
                onClick={() => handlePersonSelect(person)}
              >
                {person}명
              </PersonButton>
            ))}
          </PersonButtonContainer>
          <PersonButton
            className="available"
            onClick={handleSubmit}
            disabled={!selectedTime || !selectedPerson}
          >
            예약하기
          </PersonButton>
          <h6>선택된 인원: {selectedPerson}명</h6>
          <br />
        </>
      )}
    </>
  );
};

export default StoreDetailReservation;
