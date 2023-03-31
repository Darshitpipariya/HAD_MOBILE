import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Fieldinput from './Fieldinput';
const Fields = (params) => {


    return (
        params.fieldList.map((field) => {
            
            return <Fieldinput
                key={params.fieldList.indexOf(field)}
                index={params.fieldList.indexOf(field)}
                lableContainer={params.lableContainer}
                textLable={params.textLable}
                fieldname={field}
                fieldValueList={params.fieldValueList}
                setFieldValue={params.setFieldValue}
            />
        })
    );
}

export default Fields