const crypto = require('crypto-promise')
const cryptoPassword :any = {};

//랜덤 함수로 salt값 생성하기
cryptoPassword.salt = async() => {
	try{
		const saltBuffer = await crypto.randomBytes(32);
		const salt = saltBuffer.toString('base64');
		return salt;

	}catch(err){
		console.log(err)
	}
}

cryptoPassword.hashedPassword = async (password: any, salt: any) => {
	try {
			const hashedPasswordBuffer = await crypto.pbkdf2(password, salt , 1000, 32, 'SHA512');
			const hashedPassword = hashedPasswordBuffer.toString('base64'); 
			return hashedPassword;  
	} catch (err) {
			console.log(err);
	}
}

//module.exports = cryptoPassword;
export{
	cryptoPassword
}
