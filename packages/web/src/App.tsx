import { App as AntdApp, Button, ConfigProvider, Drawer } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import Screen from "./components/Screen";
import TopPopover from "./components/TopPopover";
import Tour from "./components/Tour";
import MetaDataEditor from "./components/MetaDataEditor";
import ModeSwitch from "./components/ModeSwitch";
import { ANTD_LANG_MAP } from "./i18n";

const App = () => {
	const inShareMode = !!window.__SHARE_KEY__;
	const { i18n } = useTranslation();
	const [mobileEditorOpen, setMobileEditorOpen] = useState(false);

	return (
		<ConfigProvider locale={ANTD_LANG_MAP[i18n.language as keyof typeof ANTD_LANG_MAP]}>
			<div className="grid min-h-screen grid-cols-3 max-lg:grid-cols-1">
				{!inShareMode && (
					<AntdApp className="max-lg:hidden">
						<LeftPanel />
					</AntdApp>
				)}
				<div
					className="flex items-center justify-center overflow-auto border-orange-400 border-r border-l border-dashed max-lg:border-none"
					id="center"
				>
					<div className="border">
						<TopPopover>
							<Screen />
						</TopPopover>
					</div>
				</div>
				{!inShareMode && <RightPanel />}
			</div>
			{!inShareMode && (
				<>
					<Button
						type="primary"
						size="large"
						className="fixed right-4 bottom-6 z-[1000] shadow-lg lg:hidden"
						onClick={() => setMobileEditorOpen(true)}
					>
						编辑 / 修改内容
					</Button>
					<Drawer
						title={
							<div className="flex items-center justify-between gap-4">
								<span>手机编辑控制台</span>
								<div className="flex items-center gap-2">
									<span className="text-xs text-gray-500">编辑模式</span>
									<ModeSwitch />
								</div>
							</div>
						}
						placement="bottom"
						height="78vh"
						open={mobileEditorOpen}
						onClose={() => setMobileEditorOpen(false)}
						 destroyOnClose={false}
					>
						<div className="h-full overflow-y-auto pb-8">
							<MetaDataEditor />
						</div>
					</Drawer>
				</>
			)}
			<Tour />
		</ConfigProvider>
	);
};

export default App;
