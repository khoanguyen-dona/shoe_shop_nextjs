import React from 'react'
import JoditEditor from 'jodit-react';
import { useRef } from 'react';

const JoditViewer = ({data}) => {
    const editor = useRef(null);

	const config = {
            toolbar: false,
            statusbar:false,
			readonly: true,         
		}
	
	return (
        <div className='  mt-10' >
                <JoditEditor
                    ref={editor}
                    value={data}
                    config={config}
                    tabIndex={1} 
                    
                />
        </div>
	);
}


export default JoditViewer