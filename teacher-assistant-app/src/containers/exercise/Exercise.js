import React from "react";
import Navbar from "../../component/Navbar/Navbar";

const Exercise = () => {
    return (
        <>
            <Navbar />
            <div className="flex w-5/12 max-md:w-4/5 mx-auto my-10 py-4 px-4 shadow shadow-independence/15 flex-wrap md:flex-nowrap ">
                <div className="flex flex-col">
                    <h1 className="font-bold text-raisin-black text-lg self-center mb-2">تمرین سری یک</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores exercitationem excepturi
                        porro nesciunt fugit culpa distinctio error doloremque, dignissimos cupiditate consequuntur
                        eaque et beatae odit quis cum, quam possimus placeat eius officia laborum eum. Optio?Lorem ipsum
                        dolor sit amet, consectetur adipisicing elit. Asperiores exercitationem excepturi porro nesciunt
                        fugit culpa distinctio error doloremque, dignissimos cupiditate consequuntur eaque et beatae
                        odit quis cum, quam possimus placeat eius officia laborum eum. Optio?
                    </p>
                    <div class="flex items-center px-4 my-4">
                        <div class="flex-1 border-t-2 border-independece/15"></div>
                        <span class="px-3 font-bold">بارگذاری پاسخ تمرین</span>
                        <div class="flex-1 border-t-2 border-independece/15"></div>
                    </div>

                    <form>
                        <label htmlFor="uploadFile" className="block">
                            فایل <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="uploadFile"
                            name="uploadFile"
                            type="file"
                            className="text-raisin-black/50 cursor-pointer file:cursor-pointer file:border-none file:py-1 file:px-3 file:bg-queen-blue file:hover:bg-blue-yonder file:text-cultured file:rounded"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Exercise;
