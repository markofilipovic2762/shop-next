import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap"

const SearchBox = ({ navigate }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline >
            <Form.Control
                type='text'
                name='q'
                onChange={e => setKeyword(e.target.value)}
                placeholder='Search products...'
                className='mr-sm-2 ml-sm-5'>
            </Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
