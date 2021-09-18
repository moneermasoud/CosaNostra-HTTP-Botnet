Imports System.Environment
Imports System.IO


Module clear_cookies


    Public Sub cls_cookies()

        Dim AppData As String = GetFolderPath(SpecialFolder.ApplicationData)

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Google\Chrome\User Data\Default\Cookies") = True Then
            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Google\Chrome\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Google(x86)\Chrome\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Google(x86)\Chrome\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Roaming\Opera Software\Opera Stable\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Roaming\Opera Software\Opera Stable\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Amigo\User\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Amigo\User\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Torch\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Torch\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Orbitum\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Orbitum\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Comodo\Dragon\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Comodo\Dragon\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Yandex\YandexBrowser\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Yandex\YandexBrowser\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\BraveSoftware\Brave-Browser\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\BraveSoftware\Brave-Browser\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Vivaldi\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Vivaldi\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Slimjet\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Slimjet\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\360Browser\Browser\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\360Browser\Browser\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Maxthon3\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Maxthon3\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\K-Melon\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\K-Melon\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Nichrome\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Nichrome\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Nichrome\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Nichrome\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Mail.Ru\Atom\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Mail.Ru\Atom\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Epic Privacy Browser\Atom\User Data\Default\Cookies") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Local\Epic Privacy Browser\Atom\User Data\Default\Cookies")
        End If

        If File.Exists(Replace(AppData, AppData.Split("\").Last(), "") & "\Roaming\Mozilla\Firefox\Profiles\nahd6ha2.default\cookies.sqlite") = True Then

            File.Delete(Replace(AppData, AppData.Split("\").Last(), "") & "\Roaming\Mozilla\Firefox\Profiles\nahd6ha2.default\cookies.sqlite")
        End If

    End Sub



    Public Sub kill_prog(name_prog As String)
        For Each prog As Process In Process.GetProcesses
            If prog.ProcessName = name_prog Then

                prog.Kill()

            End If
        Next
    End Sub

End Module
