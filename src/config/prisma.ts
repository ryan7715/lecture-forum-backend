
// 내 프로글매 내부에서 생성한 prisma 정보를 가지고
// 백엔드가 실행되는 중(express)에 "실제" 데이터베이스와 통신을 할 수 있게 해주는 파일


// prisma.config.ts는 express와는 괸련있는 파일임
// "prisma"라는 패키지는 schema.prisma를 가지고 셋업하는 일을 하는 패키지.
// "@prisma/client" 패키지는 express에서 prisma로 통신할 수 있게 해주는 패키지

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client/extension";


// 각각의 접속 정보는 string만 받을 수 있음 (port는 number임)
// 환경변수에서 가져온 값은 string | undefined 타입이기 때문에
// 논리함을 통해 값이 있을 경우 빈 string을 넣도록 조치
const adapter = new PrismaMariaDb {
    host: process.env.DATABASE_HOST || "",
        port: Number(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USERNAME || "",
        password: process.env.DATABASE_PASSWORD ||"",
        database: process.env.DATABASE_NAME ||"",
        connectionLimit: 5,
};


const prisma = new PrismaClient({ adapter});

export default prisma;