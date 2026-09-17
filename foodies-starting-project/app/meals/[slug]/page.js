import Image from "next/image";
import classes from "./page.module.css";

export default async function MealDetailPage({ params }) {
    const { slug } = await params;
    const meal = getMeal(slug);
    return (
        <>
            <header className={classes.header} >
                <div className={classes.image} >
                    <Image fill />
                </div>
                <div className={classes.headerText} >
                    <h1>TITLE</h1>
                    <p className={classes.creator} >
                        by <a href={`mailto:${'EMAIL'}`} > NAME </a> 
                    </p>
                    <p className={classes.summary} >
                        SUMMARY
                    </p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: '....'
                }} >

                </p>
            </main>
        </>
    );
}