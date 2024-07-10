import React, { useCallback, useEffect }  from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../shadcn/components/ui/button'
import { Input } from '../../shadcn/components/ui/input'
import RealtimeEditor from '../editor/Editor'
import fileHandlerService from '../../appwrite-services/file-service'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Article } from '../../models/Article'
import { RootState } from '../../store/store'
import { UserAuth } from './../../models/UserAuth';
import postService from '../../appwrite-services/post-service'
import { ID }  from "appwrite";


function PostForm(post: Article) {

    const navigate = useNavigate();
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            status: post?.status|| '', 
            image: post?.image|| '', 
            content: post?.content|| '', 
            userId: post?.userId|| '', 
            postId: post?.postId|| '', 
        } as Article
    });

    const userData = useSelector((state:RootState) => (state.auth as UserAuth).userData);

    const submitForm = async(data:any) => {
        if(post) {
            const imageFile =  data.image ? await fileHandlerService.uploadFile(data.image) : null;
            if(imageFile) {
                fileHandlerService.deleteFile(post.image);
                const dbPost = await postService.updatePost(post.postId, {...data, image: imageFile.$id})
                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
        else {
            const imageFile = await fileHandlerService.uploadFile(data.image);
            if(imageFile) {
                const fileID = imageFile.$id;
                data.fileId = fileID;
                data.userId = userData.$userId
                const dbPost = await postService.createPost(ID.unique(), data)
                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const referenceIdTransform = useCallback((value: string) => {
        if(value.length> 0) {
            return value.trim().toLowerCase().replace(/\s/g, '-')
        }
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === 'title') {
                setValue('userId',referenceIdTransform(value.title!), {shouldValidate: true})
            }
        })

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, referenceIdTransform, setValue]);

  return (
    <div className="post-container">
        <form onSubmit={handleSubmit(submitForm)} className='flex flex-wrap'>
            <div className="left-container w-2/3 px2">

            </div>
            <div className="right-container w-1/3">
                <Input placeholder='Title' className='mb-4' {...register("title", {required: true})}/>
                <Input placeholder='Slug' className='mb-4' {...register("userId", {required: true})} 
                onInput={(e) => {
                    setValue("userId", referenceIdTransform(e.currentTarget.value), {shouldValidate: true})
                }}/>
                <RealtimeEditor label='content' name='content' control={control} defaultValue={getValues("content")}/>
            </div>
        </form>
    </div>
  )
}

export default PostForm