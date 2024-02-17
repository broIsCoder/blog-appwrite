import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'
import React from 'react'


//using external component 
const PostEditor = ({
    name, control, defaultvalues
}) => {
    return (
            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='gthj1pm7nylqje387x0d0hql97iygnc7nf5b3ega4c8udzia'
                        initialValue={defaultvalues}
                        init={{
                            branding: true,
                            height:500,
                            min_height:500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; height:100%}",
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
    )
}

export default PostEditor