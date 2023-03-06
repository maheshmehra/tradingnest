import Head from "next/head";

export default function CommonStyleSheet(props)
{
    return (
        <>
            <Head>
                <title>{props.title}</title>
            </Head>

            <style>
                {
                    `
                        .showAnimator
                        {
                            display: block;
                        }
                        
                        .hideAnimator
                        {   
                            display: none;
                        }
                        
                        .animationLoading
                        {
                            background: #fff;
                            border: 1px solid;
                            border-color: #e5e6e9;
                            border-radius: 3px;
                            display: block;
                            height: 173px;
                            width: 100%;
                            padding: 12px;
                            margin-bottom: 10px;
                        }
                        @keyframes animate {
                            from {transition: none;}
                            to {background-color: #f6f7f8; transition: all 0.3s ease-out;}
                        }
                        
                        #container 
                        {
                            width: 100%;
                            height: 30px;
                        }
                        
                        #one,#two,#three,#four,#five,#six
                        {
                            position: relative;
                            background-color: #CCC;
                            height: 6px;
                            animation-name: animate;
                            animation-duration: 2s;
                            animation-iteration-count: infinite;
                            animation-timing-function: linear;
                        }
                        
                        #one
                        {
                            left: 0;
                            height: 40px;
                            width: 40px;
                        }
                        
                        #two
                        {
                            left: 50px;
                            top: -33px;
                            width: 25%;
                        }
                        
                        #three
                        {
                            left: 50px;
                            top: -20px;
                            width: 15%;
                        }
                        
                        #four
                        {
                            left: 0px;
                            top: 30px;
                            width: 80%;
                        }
                        
                        #five
                        {
                            left: 0px;
                            top: 45px;
                            width: 90%;
                        }
                        
                        #six
                        {
                            left: 0px;
                            top: 60px;
                            width: 50%;
                        }
                    `
                }
            </style>
        </>
    )
}