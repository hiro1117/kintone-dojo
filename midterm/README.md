#### what i learned

by using axios, dont need async/await since axios already returns a Promise.
https://stackoverflow.com/questions/48327559/save-async-await-response-on-a-variable
Ex.
const asyncFunc = () => {
  return axios(data)
}

const users = await asyncFunc()


#### questions
コンテンツ並び替えの際に再度apiを叩く処理しか思いつかない
getAPI()で取得したデータを再利用する方法はあるか。