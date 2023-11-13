// import getData from "../hooks/getData"

import axios from "axios"

interface Props {
  users: {
    id: number,
    name: string,
    username: string,
    address: {},
    phone: string,
    website: string,
    company: {}
  }[]
}

const ProductsPage = async ({ users }: Props) => {
  // users = await getData('https://jsonplaceholder.typicode.com/users');
  users = await axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data);

  return (
    <div>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  )
}

export default ProductsPage