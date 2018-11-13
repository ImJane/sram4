import type from 'type'

function* generator({ id, a }){
	let { code } = a;
	return code + type + id;
}

async function as(){

}
generator();
as();