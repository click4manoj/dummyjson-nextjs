export default async function SingleUser({params}:{params: Promise<{id: string}>}){
    const {id } = await params;
    const res = await fetch(`https://dummyjson.com/users/${id}`);
    const data = await res.json();
    console.log(data);
    return(<>
        <h1>{data.firstName}</h1>
    </>);
}