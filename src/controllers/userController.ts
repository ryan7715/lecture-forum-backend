import { type Request, type Response} from "express";
import userService from "../services/userService.ts";
import { UserCreateInput } from "../generated/prisma/models/User.ts";
import passwordUtility from "../utils/password/passwordUtility.ts";
import {CreateUserInputType} from "../schemas/user/createUser.ts";

// UserController라는 이름의 "user"sms
// 경로상에서 /user로 시작되는 요청이 들어오게 되는 곳이라서 userController임
// 컨드톨러(일꾼)은 (req: Request, res: Response) => {} 모양으로 정해져 있음
// Request와 Response는 내장타입이 아니라, 가져온 타입이어야 함
// 컨트롤러는 첫 번째 매개변수의 req 자리에 프론트엔드에서 보내 온 편지 자체가 들어옴
//          두 번쨰 매개변수의 res 자리에는 앞으로 내보야냐 하는 빈 택배상자가 들어옴

// 컨트롤러 계층은 프로그램 내부에서 데이터를 조작하는 1차 일꾼

const createUser =  async (req: Request, res: Response) => {
  // 1. 프론트 엔드에서 보내온 정보를 편지에서 읽고
    try {
    const { username, password, nickname, email, phoneNumber, gender, role } = req.body;


  // 2. 그 정보가 옳은 지 판단하고
  // 2-1 안 맞으면 처리가 안 됐다는 내용으로 택배를 보내고
  const validateUser: CreateUserInputType = {
      username: username,
      password: password,
      nickname: nickname,
      email: email,
      phoneNumber: phoneNumber,
      gender: gender,
  }

  // 3. 이미 User 테이블에 등록된 '사용자'라는 뜻을 담은 데이터 덩어리가 아니라
 // 3-0. 데이터베이스에게 보내 줄, 'User 테이블에 추가할 데이터'를 만들어줌
    const newUser: UserCreateInput = {
        ...validateUser,
        password: await passwordUtility.hashPassword(password),
    };

  // 3-1 데이터베이스에게 newUser 내용을 저장하도록 요청
  //     데이터베이스와 통신을 하는 일을 service도, 내부에서 일이 끝날 때까지 기다려야 함

  // 위에서 이미 password라는 이름의 변수를 쓰고 있음,
  //구조분해할당을 하려고 하는데 -> 그래서 객체 안의 key 이름을 변수명으로 써서 구조분해 할당을 해야 하는데
  //                             이미 쓰고 있는 상황이라 불가능함
  //                             '이름을 바꿔서 쓰겠다.'라고 password: 변수명을 쓸 수 있음
  const { password: _ , ...etc } = await userService.createUser(newUser);

  // 4. 회원가입이 됐다는 내용으로 택배를 보낸다.
 // 여기서부터는 응당 (Response)처리
 // res라는, 앞으로 응답에 나갈 박스에
 // result 결과를 json으로 가공하여 넣음
 res.status(201).json(etc);
 } catch (error) {
        // try를 실행할 때, 어디서든지 에러 날 경우 catch 절이 실행이 됨

        // 프리지마에서 발생된 에러인지 내로잉
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Prisma error 개체 내부에 code 항목 값이 "P2002"인 것은
            // 중복값이 있을 때의 에러 코드임
            if (error.code === "P2002")
                const errorMessage = error.message;

            if (error.Message.includes("ncikname")) {
                res.status(409).json({message: "이미 사용 중인 닉네임입니다."});
            }
            if (error.Message.includes("email")) {
                res.status(409).json({message: "이미 사용 중인 이메일입니다."});
            }
        }
        console.log(error);
        res.status(500).json({ message: "유저 생성 중 오류가 발생하였습니다."})
    }
};

const updateUser = (req: Request, res: Response)  => {

};


export default {
    createUser,
    updateUser,
};

