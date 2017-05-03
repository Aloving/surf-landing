export function getBoardIds(){
	return fetch('/getboardids',{
		method: 'post'
	})
}
