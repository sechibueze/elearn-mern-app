import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../_actions/types';
const CategoryOptions = ({
  // loading,
  // loadCategory,
  categoryItems
}) => {
  const [category, setCategory] = useState([])
  useEffect(() => {
    axios.get(`${ baseUrl }/api/category`)
      .then(({ data }) => {
        setCategory(data.data)
      })
      .catch(err => console.log('err in cat', err))
  }, [categoryItems]);
    console.log('opt cat', category)
  return ( 
          <Fragment>

            <option value='' key={1}>  Choose Category </option>
            {
              category.length > 0  && category.map((cat, idx) => (
                      <option key={idx} value={ cat._id}> { cat.title } </option>
                      ))
              
                
                
            }

          </Fragment>

  );
}
//  CategoryOptions.propTypes = {
//    loadCategory: PropTypes.func.isRequired
//  };
const mapStateToProps = state => ({
  categoryItems: state.category.categoryItems
});
export default connect(mapStateToProps)(CategoryOptions);
