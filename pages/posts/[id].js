import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds,getPostData } from "../../lib/posts";
import Head from "next/head";
import utilStyles from '../../styles/utils.module.css';

// 3 : finally reder the postData to the Dom 
export default function Post({ postData }){
    return (
    <Layout>
        <Head>
        {postData.title}
        </Head>
        <br />
        {postData.id}
        <br />
        <Date dateString={postData.date} />
        <br />
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
              <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />         
        </article>
        
    </Layout>
    );
}

// 1 : Go here first to fatch the post id as dynamic path path 
export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
    // Return a list of possible value for id
  }
// 2 : after that the getPost Data would replace the fatch the id from path to query the data
  export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData,
        },
    };
    // Fetch necessary data for the blog post using params.id
  }