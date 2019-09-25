let rulesList={};
_(_).keys().filter(i=>/^is/.test(i)).forEach(i=>rulesList[i]=_[i]);

function validator(target,rule){
	for(let key in rule){
		switch (typeof rule[key]){
			case 'boolean':{
				if(rule[key]===true){
					if(_.isFunction(rulesList[key])){
						if(!rulesList[key](target)){
							return false;
						}
					}else{
						throw (`${key}不是一个有效的验证规则`);
					}
				}
				break;
			}
			case 'string':{
				if(_.isFunction(rulesList[key])){
					if(!rulesList[key](target)){
						return false;
					}
				}else{
					throw (`${key}不是一个有效的验证规则`);
				}
			}

		}
	}
	return true;
}
export default validator;