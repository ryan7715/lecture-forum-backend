import { z } from "zod"
import {GenderType} from "../../generated/prisma/enums.ts";


// zod 패키지를 옹해 검증항 Input 값에 대한 개첵 모양 생성

export const createUser = z.object({
    username: z.string().min(4),
    password: z.string().min(6),
    nickname: z.string().min(2).max(10),
    email: z.email(),
    phoneNumber: z.string().min(12).max(13),
    gender: z.enum(GenderType),
})

// 위에서 만든 createUserSchema는 조건을 건 "객체"를 만들어내는 일이라,
// 앞으로 다른 곳에서 사용할 수 있는 타입을 infer로 만들어냄

export type CreateUserInputType = z.infer<typeof createUserSchema>;