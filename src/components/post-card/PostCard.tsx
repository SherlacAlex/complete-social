import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '../../shadcn/components/ui/card';
import fileHandlerService from '../../appwrite-services/file-service';
import logo from '../../assets/logo.jpg'


interface PostCardPropsType {
    $id: string;
    title: string;
    featuredImage: string;
}

function PostCard({$id, title, featuredImage}: PostCardPropsType) {
  return (
    <Link to={`/post/${$id}`}>
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent >
                {/* <img src={fileHandlerService.getFilePreview(featuredImage).toString()} alt="post"/> */}
                <img className='w-[300px]' src={logo} alt="post"/>
            </CardContent>
        </Card>
    </Link>
  )
}

export default PostCard