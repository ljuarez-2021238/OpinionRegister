import jwt from "jsonwebtoken";


export const validateJWT = (req, res, next) => {
 
  const jwtConfig = {
    secret: process.env.JWT_SECRET,       
    issuer: process.env.JWT_ISSUER || null,  
    audience: process.env.JWT_AUDIENCE || null, 
  };

  if (!jwtConfig.secret) {
    console.error("Error JWT: JWT_SECRET is not defined in environment variables");
    return res.status(500).json({
      success: false,
      message: "Configuration JWT_SECRET is missing",
    });
  }

  const token =
    req.header("Authorization")?.replace("Bearer ", "") ||
    req.header("x-token"); 

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
      error: "MISSING_TOKEN",
    });
  }

  try {
    const verifyOptions = {};
    if (jwtConfig.issuer) verifyOptions.issuer = jwtConfig.issuer;
    if (jwtConfig.audience) verifyOptions.audience = jwtConfig.audience;

    const decoded = jwt.verify(token, jwtConfig.secret, verifyOptions);

    req.user = {
      id: decoded.sub,               
      role: decoded.role || "User",  
      iat: decoded.iat,              
      jti: decoded.jti || null,      
    };

    next(); 
  } catch (error) {
    console.error("Error validating JWT:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "expired token",
        error: "TOKEN_EXPIRED",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "invalid token",
        error: "INVALID_TOKEN",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error validating token",
      error: "TOKEN_VALIDATION_ERROR",
    });
  }
};