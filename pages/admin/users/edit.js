import PropTypes from 'prop-types'
import React from "react";
import { useForm } from 'react-hook-form';

export default AddEdit;

export async function getStaticProps({ params }) {
    const user = await userService.getById(params.id);

    return {
        props: { user }
    }
}