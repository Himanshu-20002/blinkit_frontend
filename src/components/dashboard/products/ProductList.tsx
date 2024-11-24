import { FlatList, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import CustomText from '../../ui/CustomText'
import { Fonts } from '../../../utils/Constants'
import ProductItem from '@features/category/ProductItem'
import { FlashList } from '@shopify/flash-list'
import SearchProductList from './SearchProductList'


const ProductList:FC<{data:any}> = ({data}) => {
    const renderItem = ({item,index}:{item:any,index:number})=>{
        return <SearchProductList item={item} key={index} index={index}/>
    }
  return (
        <FlashList
        data={data}
        renderItem={renderItem}
        numColumns={1}
        keyExtractor={(item)=>item._id}
        estimatedItemSize={100}
        />
  )
}


export default ProductList