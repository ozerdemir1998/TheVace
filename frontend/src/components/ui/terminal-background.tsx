"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const TerminalBackground = () => {
    const logLines = useMemo(() => [
        "PS C:\\Projects\\TheVace\\frontend> npm run dev",
        "",
        "> frontend@1.0.0 dev",
        "> vite",
        "",
        "",
        "  VITE v7.3.1  ready in 620 ms",
        "",
        "  ➜  Local:   http://localhost:5173/",
        "  ➜  Network: use --host to expose",
        "  ➜  press h + enter to show help",
        "00:48:43 [vite] (client) Pre-transform error: Can't resolve 'tw-animate-css' in 'C:\\Projects\\TheVace\\frontend\\src'",
        "  Plugin: @tailwindcss/vite:generate:serve",
        "  File: C:/Projects/TheVace/frontend/src/index.css",
        "00:48:43 [vite] Internal server error: Can't resolve 'tw-animate-css' in 'C:\\Projects\\TheVace\\frontend\\src'",
        "  Plugin: @tailwindcss/vite:generate:serve",
        "  File: C:/Projects/TheVace/frontend/src/index.css",
        "      at finishWithoutResolve (C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\\lib\\Resolver.js:586:18)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\Resolver.js:678:14",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\Resolver.js:739:5",
        "      at eval (eval at create (C:\\Projects\\TheVace\\frontend\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:15:1)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\Resolver.js:739:5",
        "      at eval (eval at create (C:\\Projects\\TheVace\\frontend\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:27:1)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\DescriptionFilePlugin.js:89:43",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\Resolver.js:739:5",
        "      at eval (eval at create (C:\\Projects\\TheVace\\frontend\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:15:1)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\Resolver.js:739:5",
        "      at eval (eval at create (C:\\Projects\\TheVace\\frontend\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:15:1)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\Resolver.js:739:5",
        "      at eval (eval at create (C:\\Projects\\TheVace\\frontend\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:42:1)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\ConditionalPlugin.js:53:42",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\Resolver.js:739:5",
        "      at eval (eval at create (C:\\Projects\\TheVace\\frontend\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:16:1)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\forEachBail.js:39:13",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\ModulesUtils.js:74:12",
        "      at SyncAsyncFileSystemDecorator.stat (C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\\lib\\SyncAsyncFileSystemDecorator.js:66:34)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\ModulesUtils.js:50:7",
        "      at next (C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\\lib\\forEachBail.js:35:3)",
        "      at forEachBail (C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\\lib\\forEachBail.js:49:9)",
        "      at modulesResolveHandler (C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\\lib\\ModulesUtils.js:42:2)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\ModulesInHierarchicalDirectoriesPlugin.js:36:6",
        "      at _next0 (eval at create (C:\\Projects\\TheVace\\frontend\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:8:1)",
        "      at eval (eval at create (C:\\Projects\\TheVace\\frontend\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:30:1)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\SelfReferencePlugin.js:48:31",
        "      at Hook.eval [as callAsync] (eval at create (C:\\Projects\\TheVace\\frontend\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:22:1)",
        "      at Resolver.doResolve (C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\\lib\\Resolver.js:736:16)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\ConditionalPlugin.js:42:14",
        "      at Hook.eval [as callAsync] (eval at create (C:\\Projects\\TheVace\\frontend\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:37:1)",
        "      at Resolver.doResolve (C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\\lib\\Resolver.js:736:16)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\NextPlugin.js:30:14",
        "      at Hook.eval [as callAsync] (eval at create (C:\\Projects\\TheVace\\frontend\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:7:1)",
        "      at Resolver.doResolve (C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\\lib\\Resolver.js:736:16)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\NextPlugin.js:30:14",
        "      at Hook.eval [as callAsync] (eval at create (C:\\Projects\\TheVace\\frontend\\node_modules\\tapable\\lib\\HookCodeFactory.js:31:10), <anonymous>:7:1)",
        "      at Resolver.doResolve (C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\\lib\\Resolver.js:736:16)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\DescriptionFilePlugin.js:80:17",
        "      at C:\\Projects\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\DescriptionFileUtils.js:161:24",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\forEachBail.js:39:13",
        "      at onJson (C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\DescriptionFileUtils.js:96:6)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\DescriptionFileUtils.js:123:7",
        "      at SyncAsyncFileSystemDecorator.readJson (C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\\lib\\SyncAsyncFileSystemDecorator.js:204:6)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\DescriptionFileUtils.js:104:26",
        "      at next (C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\\lib\\forEachBail.js:35:3)",
        "      at forEachBail (C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\\lib\\forEachBail.js:49:9)",
        "      at findDescriptionFile (C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\DescriptionFileUtils.js:70:3)",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\DescriptionFileUtils.js:167:12",
        "      at C:\\Projects\\TheVace\\frontend\\node_modules\\enhanced-resolve\lib\\forEachBail.js:39:13",
    ], []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-20 bg-black z-0">
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: "-50%" }}
                transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex flex-col gap-1 p-8"
            >
                {/* Render doubled logs for seamless infinite loop */}
                {[...logLines, ...logLines, ...logLines, ...logLines].map((line, idx) => (
                    <div key={idx} className="font-mono text-[10px] md:text-sm whitespace-pre text-white leading-tight opacity-40">
                        {line}
                    </div>
                ))}
            </motion.div>

            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10" />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-20" />
        </div>
    );
};
