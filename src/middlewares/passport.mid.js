import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { createUserService, readByService, readOneUserService } from "../services/users.service.js"
import { createHash, verifyHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";
import UsersDto from "../dto/users.dto.js";
import sendEmialOfRegister from "../helpers/registerEmail.helper.js";


passport.use("register",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                let data = req.body

                if (!data.name || typeof data.name !== "string" || data.name.length < 2 || data.name.length > 100) {
                    return done(null, false, { message: "Nombre inválido.", statusCode: 400 });
                }

                if (!data.city || typeof data.city !== 'string' || data.city.length < 2 || data.city.length > 100) {
                    return done(null, false, { message: "Ciudad inválida.", statusCode: 400 });
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email || !emailRegex.test(email) || email.length > 255) {
                    return done(null, false, { message: "Formato de email inválido.", statusCode: 400 });
                }

                if (!password || typeof password !== 'string' || password.length < 6 || password.length > 100) { 
                    return done(null, false, { message: "Contraseña invalida (minimo 6 caracteres).", statusCode: 400 });
                }

                

                const user = await readByService({ email })
                if (user) {
                    return done(null, null, { message: "El email ya esta registrado", statusCode: 401 })
                }


                data = new UsersDto(data)

                const verifyCodeExpires = Date.now() + 1000 * 60 * 15
                data.verifyCodeExpires = verifyCodeExpires
                
                const response = await createUserService(data)
                await sendEmialOfRegister({ email, verifyCode: response.verifyCode })
                done(null, response)
            } catch (error) {
                done(error)
            }
        }
    ))


passport.use("login",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {

                const response = await readByService({ email })
                if (!response) {
                    return done(null, null, { message: "Invalid credentials", statusCode: 401 })
                }
                const verifyAccount = response.isVerify
                if (!verifyAccount) {
                    return done(null, null, { message: "Invalid credentials", statusCode: 401 })
                }
                const verify = verifyHash(password, response.password)
                if (!verify) {
                    return done(null, null, { message: "Invalid credentials", statusCode: 401 })
                }
                const data = {
                    user_id: response._id,
                    email: response.email,
                    rol: response.rol,
                    name: response.name,
                    city: response.city,
                    avatar: response.avatar
                }
                const token = createToken(data)
                req.token = token
                done(null, response)
            } catch (error) {
                done(error)
            }
        }
    ))

passport.use(
    "current",
    new JwtStrategy(
        { jwtFromRequest: ExtractJwt.fromExtractors([req => req?.cookies?.token]), secretOrKey: process.env.SECRET },
        async (data, done) => {
            try {
                const { user_id } = data
                const user = await readOneUserService(user_id)


                if (!user) {
                    return done(null, null, { message: "Bad auth", statusCode: 401 })
                }
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    "admin",
    new JwtStrategy(
        { jwtFromRequest: ExtractJwt.fromExtractors([req => req?.cookies?.token]), secretOrKey: process.env.SECRET },
        async (data, done) => {
            try {
                const { user_id } = data
                const user = await readOneUserService(user_id)
                if (!user) {
                    return done(null, null, { message: "Bad auth", statusCode: 401 })
                }
                if (user.rol !== "admin") {
                    return done(null, null, { message: "Forbidden", statusCode: 403 })
                }
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)

export default passport