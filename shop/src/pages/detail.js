import  {useParams}  from 'react-router-dom'
import  data  from '../data.js'

let Detail = (props) => {

    // 사용자가 url뒤에 입력한 parameter가 날아옴
    let {id} = useParams();
    let datafilter = data.filter((v, i) => {
        if (v.id == id)
            return true
    }) 


    return (
        <div className="container">
        <div className="row">
            <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes" + (datafilter[0].id + 1) + ".jpg"} width="100%" />
            </div>
            <div className="col-md-6">
            <h4 className="pt-5">{datafilter[0].title}</h4>
            <p>{datafilter[0].content}</p>
            <p>{datafilter[0].price}</p>
            <button className="btn btn-danger">주문하기</button> 
            </div>
        </div>
        </div> 
    )
}

export default Detail;