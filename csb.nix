with import <nixpkgs> {};
 
stdenv.mkDerivation {
    name = "csb";
    buildInputs = [
        ffmpeg
        youtube-dl-exec
        express
        cors
    ];
    shellHook = ''
        export PATH="$PWD/node_modules/.bin/:$PATH"
    '';
}
