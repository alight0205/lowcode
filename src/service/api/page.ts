import axios from '../request'

export async function uploadPage(pageValue:string){
  const data = await axios.post('/api/page',{pageValue})
  return data;
}export async function getPageValue(id:string){
  const data = await axios.get('/api/page/'+id)
  return data;
}