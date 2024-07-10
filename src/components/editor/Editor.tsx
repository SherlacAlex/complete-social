import React from 'react';
import { Editor  } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import { render } from '@testing-library/react';

interface RealtimeEditorProps {
    name: string,
    control: any,
    label: string,
    defaultValue: string
}

export default function RealtimeEditor({name, control, label, defaultValue = ""} :RealtimeEditorProps) {
  return (
    
    <div className="main-container">
        {label && <div className='pl-1 mb-1 inline-block'>{label}</div>}
        <Controller name={name} control={control} render={({field: {onChange}}) => (
            <Editor id='your-id'  initialValue={defaultValue} init={{
                initialValue:defaultValue,
                branding: false,
                menubar: true,
                height: 500,
                toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
                plugins: [
                    'advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
                    'searchreplace', 'table', 'wordcount'
                ],
            }} onEditorChange={onChange}/>
        )}/>
    </div>
  )
}
