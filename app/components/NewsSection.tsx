import { Fragment } from "react/jsx-runtime";
import {news, NewsCard} from "~/components/ui/NewsCard";

export function NewsSection(news: news[]) {
    return (
      <div className='flex flex-col-reverse xl:flex-row items-center justify-center'>
      {/*    {news.news.data.map((new) => */}
      {/*        <Fragment key={new.id}>*/}
      {/*          <NewsCard id={new.id} title={new.title} pic={new.id} />*/}
      {/*</Fragment>*/}
      {/*        )}*/}
      </div>
    );
}