import React, { Component } from 'react';
import { Card, CardTitle, CardHeader, CardBody, Button } from 'reactstrap';
import { useContentful } from 'react-contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const Page = props => {
  const { data, error, fetched, loading } = useContentful({
    contentType: 'post',
    query: {
      'sys.id': '4l4TjAl5N03EValgeyIruw',
    }
  });

  if (loading || !fetched) {
    return null;
  }

  if (error) {
    console.error(error);
    return null;
  }


  if (!data) {
    return <p>Page does not exist.</p>;
  }

  var html = {__html: "<div>" + documentToHtmlString(data.items[0].fields.body) + "</div>"};

  // Process and pass in the loaded `data` necessary for your page or child components.
  return (
    <div dangerouslySetInnerHTML={html}></div>
  )
}
export default Page;