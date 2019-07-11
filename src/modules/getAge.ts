const getAge = (age: any) => {
		const ageModulo = age%10

		if(age/10 >= 2){
			if(ageModulo >= 0 && ageModulo <= 3){
				return ('20대 초반')
			} else if(ageModulo >= 4 && ageModulo <= 6){
				return ('20대 중반')
			} else {
				return ('20대 후반')
			}
		} else if(age/10 >= 3){
			if(ageModulo >= 0 && ageModulo <= 3){
				return ('30대 초반')
			} else if(ageModulo >= 4 && ageModulo <= 6){
				return ('30대 중반')
			}
		} 
	}


export {
	getAge
}
