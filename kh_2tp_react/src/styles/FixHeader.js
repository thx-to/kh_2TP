/* eslint-disable react/jsx-pascal-case */
import styled from "styled-components";
import StoreSearch from "../search/StoreSearch";

const Header = styled.header`
  width: 1920px;
  height: 260px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; /* 다른 요소들 위에 표시되도록 설정 */

  background-color: #fff; /* 배경 색 */
`;

const Hdiv1 = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between; /* 양쪽 끝으로 배치 */
  align-items: center; /* 세로 가운데 정렬 */

  img {
    height: 50px;
  }
`;

const Hdiv1_L = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Hdiv1_R = styled.div`
  margin-right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Hdiv2 = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBox = styled.div`
  width: 40%;
  height: 75%;
  border: 1px solid #e4e4e4;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Hdiv3 = styled.div`
  width: 100%;
  height: 90px;
  border: 1px solid #e4e4e4;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px; /* 이미지 간의 간격 */

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    object-fit: cover;
  }

  .text {
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
    color: #a4a4a4;
  }
`;

const ImageContainer = styled.div`
  width: auto;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const FixHeader = () => {
  return (
    <>
      <Header>
        <Hdiv1>
          <Hdiv1_L>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F00백부커02B.png?alt=media&token=9bccec14-c221-42c0-8342-16f463bcb1f0"
              alt="Logo"
            />
          </Hdiv1_L>
          <Hdiv1_R>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2FProfile.png?alt=media&token=6f3e2ec4-737f-4646-9d52-254c21319266"
              alt="Profile"
            />
          </Hdiv1_R>
        </Hdiv1>
        <Hdiv2>
          <SearchBox>
            <StoreSearch />
          </SearchBox>
        </Hdiv2>
        <Hdiv3>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F01빽보이피자01.png?alt=media&token=73658b91-8b0f-4c8f-82e7-3acc11ef09ec"
                alt="빽보이피자 로고"
              />
            </ImageContainer>
            <div className="text">빽보이피자</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F02역전우동01.png?alt=media&token=0c235c92-8e33-4e42-93ff-f0cf05867bd0"
                alt="역전우동 로고"
              />
            </ImageContainer>
            <div className="text">역전우동</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F03빽다방01.png?alt=media&token=e3682b85-0916-49d5-8366-1a0563673eb1"
                alt="빽다방 로고"
              />
            </ImageContainer>
            <div className="text">빽다방</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F04홍콩반점01.png?alt=media&token=21bfafba-f254-4f97-bfe4-cf29481cc210"
                alt="홍콩반점 로고"
              />
            </ImageContainer>
            <div className="text">홍콩반점</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F05롤링파스타01.png?alt=media&token=9ce4e527-f189-4a25-8e84-dca500aac097"
                alt="롤링파스타 로고"
              />
            </ImageContainer>
            <div className="text">롤링파스타</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F06한신포차01.png?alt=media&token=f1811a7a-92b8-4b06-aaab-b91320f6b156"
                alt="한신포차 로고"
              />
            </ImageContainer>
            <div className="text">한신포차</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F07백스비어01.png?alt=media&token=fa3f5d61-6a25-417a-98b0-fefb4acdf981"
                alt="백스비어 로고"
              />
            </ImageContainer>
            <div className="text">백스비어</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F08새마을식당01.png?alt=media&token=eddf31f9-0ed7-48f9-9468-97b71e920530"
                alt="새마을식당 로고"
              />
            </ImageContainer>
            <div className="text">새마을식당</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F09제순식당01.png?alt=media&token=60c400f6-ce3c-40f2-bc87-99fff289b1f0"
                alt="제순식당 로고"
              />
            </ImageContainer>
            <div className="text">제순식당</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F10리춘시장01.png?alt=media&token=c852b849-de8e-4f72-ad97-31b510bdc99f"
                alt="리춘시장 로고"
              />
            </ImageContainer>
            <div className="text">리춘시장</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F11고투웍01.png?alt=media&token=ccef839c-ae1d-4d8f-88e5-f2ab63ee9f67"
                alt="고투웍 로고"
              />
            </ImageContainer>
            <div className="text">고투웍</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F12홍콩분식01.png?alt=media&token=dd48f407-6319-430b-97ef-81c226f02ce5"
                alt="홍콩분식 로고"
              />
            </ImageContainer>
            <div className="text">홍콩분식</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F13쌈밥01.png?alt=media&token=34e41297-8b89-4e59-817f-59a1260a3eaa"
                alt="쌈밥 로고"
              />
            </ImageContainer>
            <div className="text">쌈밥</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F14본가01.png?alt=media&token=a88b02d1-6e75-4e10-adc2-74d056d6c83b"
                alt="본가 로고"
              />
            </ImageContainer>
            <div className="text">본가</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F15인생설렁탕01.png?alt=media&token=a5ab642d-c6cf-48df-9c4b-4220fc3a81cb"
                alt="인생설렁탕 로고"
              />
            </ImageContainer>
            <div className="text">인생설렁탕</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F16막이오름01.png?alt=media&token=dd7007af-8b39-4292-a1cd-3fdd7f0d7bf7"
                alt="막이오름 로고"
              />
            </ImageContainer>
            <div className="text">막이오름</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F17연돈볼카츠01.png?alt=media&token=0c942129-57ba-4d59-84f0-59ee82e11b3e"
                alt="연돈볼카츠 로고"
              />
            </ImageContainer>
            <div className="text">연돈볼카츠</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F18돌배기집01.png?alt=media&token=66a0822c-e593-4c1d-bfeb-44f34f76f3a2"
                alt="돌배기집 로고"
              />
            </ImageContainer>
            <div className="text">돌배기집</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F19미정국수01.png?alt=media&token=9cf1be65-71df-42e4-995f-c16fd81e4d5e"
                alt="미정국수 로구"
              />
            </ImageContainer>
            <div className="text">미정국수</div>
          </div>
          <div>
            <ImageContainer>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kh-basic-frontend-react-f5a7b.firebasestorage.app/o/PAIKBOOKER%2F20백철판01.png?alt=media&token=67e1a85e-e2f0-4aaa-8efa-bd6f28ec7144"
                alt="백철판 로고"
              />
            </ImageContainer>
            <div className="text">백철판</div>
          </div>
        </Hdiv3>
      </Header>
    </>
  );
};

export default FixHeader;
