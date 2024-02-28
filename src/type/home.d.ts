interface WinFileInfo {
    FileName: string;
    LanguageCode: string;
    Language: string;
    Edition: string;
    Architecture: string;
    Size: string;
    Sha1: string;
    FilePath: string;
    Architecture_Loc: string;
    Edition_Loc: string;
    PushTime: string;
    BuildVer: string;
    VerCode: string;
    SystemCode: string;
  }

// 对于 "SystemCode"，为了方便表示系统代码和其对应的名称，可以定义一个单独的类型：
type SystemCodeOption = {
    label: string;
    value: string;
};

// 然后在主接口中引用这个类型：
interface VersionsOption {
    SystemCodes: SystemCodeOption[];
    Versions: {
        [systemCode: string]: {
            label: string;
            value: string;
        }[];
    };
}


interface Language {
  label: string;
  value: string;
  label_cn: string;
}

interface Edition {
  label: string;
  value: string;
  label_cn: string;
}

interface EditionAndLanguage {
  Language: Language[];
  Edition: Edition[];
}

export { WinFileInfo, VersionsOption ,Edition,Language,EditionAndLanguage}