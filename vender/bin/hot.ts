
import type { ConfigType  } from '../types';
import FileListenPlugin from '../component/file-listen-plugin';
import type { Plugin } from 'vite';
function Run(config?: ConfigType) : Plugin {
    let fileListenPlugin = new FileListenPlugin(config);
    return {
        name: 'file-listen',
        
        handleHotUpdate(hmrContext) {
            fileListenPlugin.listen({
                root: hmrContext?.server?.config?.root,
                path: hmrContext.file
            })
         
        }
    }
}


export default Run;






